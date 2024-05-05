const calculateAvailability = (reservations, startDate, endDate) => {
  const availabilityMap = {};

  // Initialize all dates between start and end as available
  const currentDate = new Date(startDate);
  const end = new Date(endDate);
  while (currentDate <= end) {
    availabilityMap[currentDate.toISOString().split('T')[0]] = true; // Assuming date format is YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Mark dates covered by reservations as unavailable
  reservations.forEach((reservation) => {
    const reservationStartDate = new Date(reservation.startDate);
    const reservationEndDate = new Date(reservation.endDate);

    let currentDate = new Date(reservationStartDate);
    while (currentDate <= reservationEndDate) {
      availabilityMap[currentDate.toISOString().split('T')[0]] = false;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return availabilityMap;
};
module.exports = {calculateAvailability};
