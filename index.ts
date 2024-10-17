import inquirer from 'inquirer';
import { Seat } from './types';

class SeatBookingSystem {
  private seats: Seat[] = [];
  private premiumCost: number = 20;
  
  constructor(totalSeats: number) {
    // Initialize seats with a mix of premium and regular
    for (let i = 1; i <= totalSeats; i++) {
      this.seats.push({
        number: `Seat-${i}`,
        isBooked: false,
        isPremium: i <= totalSeats / 2, // Let's say first half are premium
      });
    }
  }

  displaySeats() {
    console.log("\nAvailable seats:");
    this.seats.forEach(seat => {
      console.log(`${seat.number} - ${seat.isBooked ? 'Booked' : 'Available'} ${seat.isPremium ? '(Premium)' : ''}`);
    });
  }

  async bookSeat() {
    const availableSeats = this.seats.filter(seat => !seat.isBooked);
    if (availableSeats.length === 0) {
      console.log("No seats available.");
      return;
    }

    const { selection } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selection',
        message: 'Do you want to select a seat yourself or let the system pick?',
        choices: ['Select Myself', 'Let System Pick'],
      },
    ]);

    if (selection === 'Select Myself') {
      const seatChoices = availableSeats.map(seat => ({
        name: `${seat.number} ${seat.isPremium ? '(Premium)' : ''}`,
        value: seat.number,
      }));

      const { chosenSeat } = await inquirer.prompt([
        {
          type: 'list',
          name: 'chosenSeat',
          message: 'Choose a seat:',
          choices: seatChoices,
        },
      ]);

      this.confirmBooking(chosenSeat);
    } else {
      const systemSeat = availableSeats[0].number; // Automatically select the first available seat
      console.log(`System selected ${systemSeat}`);
      this.confirmBooking(systemSeat);
    }
  }

  async confirmBooking(seatNumber: string) {
    const seat = this.seats.find(s => s.number === seatNumber);
    if (!seat) {
      console.log("Invalid seat selection.");
      return;
    }

    let totalCost = 0;
    if (seat.isPremium) {
      totalCost += this.premiumCost;
    }

    console.log(`You have selected ${seat.number} ${seat.isPremium ? '(Premium)' : ''}. Total cost: $${totalCost}`);

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to confirm the booking?',
      },
    ]);

    if (confirm) {
      seat.isBooked = true;
      console.log(`Seat ${seat.number} has been booked successfully.`);
    } else {
      console.log("Booking cancelled.");
    }
  }

  async cancelSeat() {
    const bookedSeats = this.seats.filter(seat => seat.isBooked);
    if (bookedSeats.length === 0) {
      console.log("No seats are booked.");
      return;
    }

    const seatChoices = bookedSeats.map(seat => ({
      name: seat.number,
      value: seat.number,
    }));

    const { seatToCancel } = await inquirer.prompt([
      {
        type: 'list',
        name: 'seatToCancel',
        message: 'Select a seat to cancel:',
        choices: seatChoices,
      },
    ]);

    const seat = this.seats.find(s => s.number === seatToCancel);
    if (seat) {
      seat.isBooked = false;
      console.log(`Seat ${seat.number} has been cancelled.`);
    }
  }
}

async function main() {
  const system = new SeatBookingSystem(10); // Example: 10 seats

  let exit = false;
  while (!exit) {
    system.displaySeats();

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Book a Seat', 'Cancel a Seat', 'Exit'],
      },
    ]);

    switch (action) {
      case 'Book a Seat':
        await system.bookSeat();
        break;
      case 'Cancel a Seat':
        await system.cancelSeat();
        break;
      case 'Exit':
        exit = true;
        break;
    }
  }
}

main();
