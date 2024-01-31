var inr = require("../Data/GRES/GTotalActINR.json");

var sknames = [
  "G Suite Basic",
  "Google Workspace Business Plus",
  "Google Workspace Business Standard",
  "Google Workspace Business Starter",
  "Google Workspace Enterprise Plus",
  "Google Workspace Enterprise Standard",
  "Google-Apps-For-Business",
];

var INR = inr.filter(function (item) {
  return sknames.includes(item.skuName);
});

const calculateData = (INR) => {
  return new Promise((resolve) => {
    let result = {
      totalActiveUsers: 0,
      INR: {
        total: INR.length,
        activeAccounts: 0,
        activeUsers: 0,
        suspendedAccounts: 0,
      },
    };
    if (INR.length > 0) {
      INR.map((item) => {
        if (item.status === "ACTIVE" && item.seats) {
          result.INR.activeAccounts++;
          result.INR.activeUsers += getLicenseCount(item);
          result.totalActiveUsers += getLicenseCount(item);
        } else if (item.status == "SUSPENDED" && item.seats) {
          result.INR.suspendedAccounts++;
        }
      });
    }
    resolve(result);
  });
};

function getLicenseCount(item) {
  if (item.seats) {
    if (!item.seats.licensedNumberOfSeats && !item.seats.numberOfSeats) {
      return item.seats.maximumNumberOfSeats;
    }
    if (item.seats.licensedNumberOfSeats) {
      return item.seats.licensedNumberOfSeats;
    }
    if (item.seats.numberOfSeats) {
      return item.seats.numberOfSeats;
    }
    return 0;
  }
}

calculateData(INR).then((result) => {
  console.log(result);
});
