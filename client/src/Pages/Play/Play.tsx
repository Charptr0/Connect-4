import { useEffect, useState } from "react";
import Board from "./Components/Board/Board";
import styles from "./Play.module.scss";
import { Socket } from "socket.io-client";
import {
    Cell,
    checkWinner,
    getCurrentPlayers,
    initializeBoard,
} from "./Utils";
import {
    getRoomId,
    getUsername,
    removeRoomId,
} from '../../Utils';
import NotificationModal from "../../Components/NotificationModal/NotificationModal";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import Logs from "./Components/Log/Log";

interface Props {
    socket: Socket,
    switchPage: Function,
    opponentName?: string
}

interface ModalInterface {
    title: string;
    desc: string;
    btnPrimaryText: string;
    btnSecondaryText: string;
    btnPrimaryOnClick: React.MouseEventHandler<HTMLButtonElement>;
    btnSecondaryOnClick: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Render the page for playing online 
 */
export default function Play(props: Props): JSX.Element {
    const [currentBoard, setCurrentBoard] = useState<number[][]>(initializeBoard());
    const [isPlayer1Turn, setPlayer1Turn] = useState<boolean>(true);
    const [allowToMove, setAllowToMove] = useState<boolean>(true);
    const [winnerFound, setWinnerFound] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [totalPlayers, setTotalPlayers] = useState<number>(1);
    const [modal, setModal] = useState<ModalInterface | null>();
    const [opponentName, setOpponentName] = useState<string>('???');
    const [userScore, setUserScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [notificationText, setNotificationText] = useState<string>('');
    const [logs, setLogs] = useState<string[]>(["Welcome to the chatroom!"]);

    useEffect(() => {
        // kick the user out of this page if they don't have a room id
        if (!getRoomId()) {
            return;
        }

        // set the current user to their username
        // if no username was provided, default to guest
        setUsername(getUsername() || 'Guest');

        window.addEventListener('beforeunload', () => {
            removeRoomId();
            props.socket.disconnect();
        });

        props.socket.connect();

        // on open listener
        props.socket.on("connect", async () => {
            props.socket.emit("joinRoom", getRoomId(), getUsername());
            const playerCount = await getCurrentPlayers();
            setTotalPlayers(playerCount);
            setNotificationText("Waiting for an another player");

            if (playerCount === 2) {
                try {
                    const res = await axios.get(`https://connect4-backend.charptrzero.net/get-opponent/${getRoomId()}/${getUsername()}`);
                    setOpponentName(res.data.username || "NULL");

                } catch (err) {
                    console.log(err);
                }
            }
        });

        // listener when a another user joined the room
        props.socket.on("joinedRoom", async (username) => {
            setTotalPlayers(await getCurrentPlayers());
            setOpponentName(username);
        });

        props.socket.on("gameReset", () => {
            reset();
            setModal(null);
        });

        // listener when a user make a move
        props.socket.on("updateBoard", (board, isPlayer1Turn) => {
            setCurrentBoard(board);

            if (checkWinner(board) !== Cell.EMPTY) {
                setWinnerFound(true);
                if (isPlayer1Turn) {
                    setModal({
                        title: "A winner has been found!",
                        desc: "You Win",
                        btnPrimaryText: "Start a New Game",
                        btnSecondaryText: "Leave Room",
                        btnPrimaryOnClick: () => {
                            reset();
                            props.socket.emit("resetGame", getRoomId());
                        },
                        btnSecondaryOnClick: () => {
                            setModal(null);
                            window.location.reload();
                        },
                    })

                    setUserScore(userScore + 1);
                }

                else {
                    setModal({
                        title: "A winner has been found!",
                        desc: "You Lose",
                        btnPrimaryText: "Start a New Game",
                        btnSecondaryText: "Leave Room",
                        btnPrimaryOnClick: () => {
                            reset();
                            props.socket.emit("resetGame", getRoomId());
                        },
                        btnSecondaryOnClick: () => {
                            setModal(null);
                            window.location.reload();
                        },
                    })

                    setOpponentScore(opponentScore + 1);
                }
                setAllowToMove(false);
            }

            else {
                setAllowToMove(true);
                setPlayer1Turn(isPlayer1Turn);
            }

        });

        // listener when a user disconnect from the room
        props.socket.on("playerLeft", async () => {
            props.socket.disconnect();
            setNotificationText("The player left");

            setTotalPlayers(await getCurrentPlayers());
            setModal({
                title: "Heads Up!",
                desc: "The other player have disconnected from the room.",
                btnPrimaryText: "Leave Room",
                btnSecondaryText: "Close",
                btnPrimaryOnClick: () => {
                    setModal(null);
                    window.location.reload();
                },
                btnSecondaryOnClick: () => setModal(null),
            });
        });
    }, [currentBoard, props.socket, userScore, opponentScore]);

    useEffect(() => {
        props.socket.on("receiveMessage", (message, opponentUsername) => {
            setLogs(prev => [...prev, `${opponentUsername}: ${message}`]);
        })
    }, []);

    function reset() {
        setModal(null);
        setCurrentBoard(initializeBoard());

        setWinnerFound(false);
        setPlayer1Turn(true);
        setAllowToMove(true);

    }

    /**
     * Update the board and send the request to the other player
     * 
     * @param col the column number that the user has clicked
     */
    function onPlayerMove(col: number) {
        if (!allowToMove || totalPlayers < 2) return;

        // prevent the user from making a move when a column is full
        if (currentBoard[0][col] !== Cell.EMPTY) {
            setModal({
                title: "Error!",
                desc: "Invalid Placement",
                btnPrimaryText: "Ok",
                btnSecondaryText: "Close",
                btnPrimaryOnClick: () => {
                    setModal(null);
                },
                btnSecondaryOnClick: () => {
                    setModal(null);
                },
            });

            return;
        }

        // search from bottom to top
        // we will place the player in the first empty cell
        for (let i = currentBoard.length - 1; i >= 0; i--) {
            const cell = currentBoard[i][col];

            // cell is found empty
            if (cell === Cell.EMPTY) {
                // update board
                isPlayer1Turn ? currentBoard[i][col] = Cell.PLAYER_1 : currentBoard[i][col] = Cell.PLAYER_2;
                setCurrentBoard(currentBoard);
                setAllowToMove(false);
                props.socket.emit("playerMoved", currentBoard, isPlayer1Turn, getRoomId());
                break;
            }
        }

        if (checkWinner(currentBoard) !== Cell.EMPTY) {
            setWinnerFound(true);
            if (isPlayer1Turn) {
                setModal({
                    title: "A winner has been found!",
                    desc: "You Win",
                    btnPrimaryText: "Start a New Game",
                    btnSecondaryText: "Leave Room",
                    btnPrimaryOnClick: () => {
                        reset();
                        props.socket.emit("resetGame", getRoomId());
                    },
                    btnSecondaryOnClick: () => {
                        setModal(null);
                        window.location.reload();
                    },
                })

                setUserScore(userScore + 1);
            }

            else {
                setModal({
                    title: "A winner has been found!",
                    desc: "You Lose",
                    btnPrimaryText: "Start a New Game",
                    btnSecondaryText: "Leave Room",
                    btnPrimaryOnClick: () => {
                        reset();
                        props.socket.emit("resetGame", getRoomId());
                    },
                    btnSecondaryOnClick: () => {
                        setModal(null);
                        window.location.reload();
                    },
                })
                setOpponentScore(opponentScore + 1);
            }
            setAllowToMove(false);
        }
    }

    function sendMessageHandler(message: string) {

        setLogs(prev => [...prev, `${getUsername()}: ${message}`]);
        props.socket.emit("sendMessage", getRoomId(), getUsername(), message);
    }

    return (
        <>
            {modal && <Modal
                title={modal.title}
                desc={modal.desc}
                btnPrimaryText={modal.btnPrimaryText}
                btnSecondaryText={modal.btnSecondaryText}
                btnPrimaryOnClick={modal.btnPrimaryOnClick}
                btnSecondaryOnClick={modal.btnSecondaryOnClick}
                backdropOnClick={() => setModal(null)}
            />}

            <div className={styles.flexContainer}>
                <div className={styles.middleContainer}>
                    <h1>Connect 4</h1>
                    <h2>Room Number: {getRoomId()}</h2>
                </div>

                {totalPlayers < 2 && <NotificationModal text={notificationText} />}
                {totalPlayers === 2 && !allowToMove && !winnerFound ? <NotificationModal text="Waiting on your opponent" /> : null}

                <Board
                    board={currentBoard}
                    isPlayer1Turn={isPlayer1Turn}
                    onPlayerMoveHandler={onPlayerMove}
                />

                {totalPlayers === 2 && <div className={styles.utilBtnContainer}><button onClick={() => { reset(); props.socket.emit("resetGame", getRoomId()); }}>Start New Game</button></div>}
                <div className={styles.utilBtnContainer}><button onClick={() => window.location.reload()}>Leave Room</button></div>
                <Logs logs={logs} sendMessageHandler={sendMessageHandler} />

                <div className={styles.scoreContainer}>
                    <h1>Current Scores</h1>
                    <h2>You: {username}</h2>
                    <h3>{userScore}</h3>

                    <h2>Your opponent: {opponentName}</h2>
                    <h3>{opponentScore}</h3>
                </div>
            </div>
        </>
    )
}