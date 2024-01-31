var inr = require("../Data/CSV/CTotalActINR.json");

var sknames = [
  "G Suite Basic",
  "Google Workspace Business Plus",
  "Google Workspace Business Standard",
  "Google Workspace Business Starter",
  "Google Workspace Enterprise Plus",
  "Google Workspace Enterprise Standard",
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
        if (item.status === "Active") {
          result.INR.activeAccounts++;
          result.INR.activeUsers += getLicenseCount(item);
          result.totalActiveUsers += getLicenseCount(item);
        } else if (item.status == "Suspended") {
          result.INR.suspendedAccounts++;
        }
      });
    }
    resolve(result);
  });
};

function getLicenseCount(item) {
  if (item) {
    item.licensedNumberOfSeats = parseInt(item.licensedNumberOfSeats);
    if (item.licensedNumberOfSeats) {
      return item.licensedNumberOfSeats;
    }
    if (item.numberOfSeats) {
      return item.numberOfSeats;
    }
    return 0;
  }
}

calculateData(INR).then((result) => {
  console.log(result);
});
