import { useState, useEffect } from "react";
import { ethers } from "ethers";
import reservation_abi from "../artifacts/contracts/Reservation.sol/Reservation.json";

export default function HomePage() {
    const [reservationStatus, setReservationStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // State to manage loading status

    // Function to fetch contract and set up signer
    const getContract = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []); // Request user to connect their wallet
                const signer = provider.getSigner();
                const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, reservation_abi.abi, signer);
                return contract;
            } catch (error) {
                console.error("Error getting contract:", error);
            }
        } else {
            console.error("Ethereum object not found");
        }
    };

    // Function to make a reservation
    const makeReservation = async () => {
        try {
            const contract = await getContract();
            const tx = await contract.makeReservation();
            await tx.wait(); // Wait for the transaction to be mined
            setReservationStatus(true);
        } catch (error) {
            console.error("Error making reservation:", error);
        }
    };

    // Function to cancel a reservation
    const cancelReservation = async () => {
        try {
            const contract = await getContract();
            const tx = await contract.cancelReservation();
            await tx.wait(); // Wait for the transaction to be mined
            setReservationStatus(false);
        } catch (error) {
            console.error("Error canceling reservation:", error);
        }
    };

    // Function to get reservation status
    useEffect(() => {
        const fetchReservationStatus = async () => {
            try {
                const contract = await getContract();
                const address = await contract.signer.getAddress();
                const status = await contract.getReservationStatus(address);
                setReservationStatus(status);
            } catch (error) {
                console.error("Error fetching reservation status:", error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching status
            }
        };
        fetchReservationStatus();
    }, []);

    if (isLoading) {
        return <div className="container"><p>Loading...</p></div>;
    }

    return (
        <div className="container">
            <h1 className="title">Reservation System</h1>
            <p className="status">Reservation Status: {reservationStatus ? "Reserved" : "Not Reserved"}</p>
            <button className="action-button" onClick={makeReservation}>Make Reservation</button>
            <button className="action-button" onClick={cancelReservation}>Cancel Reservation</button>
        </div>
    );
}
