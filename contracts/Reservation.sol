
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Reservation {
    address public owner;
    mapping(address => bool) public reservations;
    
    event Reserved(address indexed user);
    event Cancelled(address indexed user);

    constructor() {
        owner = msg.sender;
    }

    // Make a reservation
    function makeReservation() public {
        require(!reservations[msg.sender], "You already have a reservation.");
        reservations[msg.sender] = true;
        emit Reserved(msg.sender);
    }

    // Cancel a reservation
    function cancelReservation() public {
        require(reservations[msg.sender], "You don't have a reservation to cancel.");
        reservations[msg.sender] = false;
        emit Cancelled(msg.sender);
    }

    // Check reservation status
    function getReservationStatus(address _user) public view returns(bool) {
        return reservations[_user];
    }
}
