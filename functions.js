// functions.js

const _ = require("lodash"); // Use require for lodash in CommonJS

exports.filterStampRate = function (
  customStampMaster,
  docType,
  renewal_time = ""
) {
  const matchingStamps = customStampMaster.filter(
    (x) =>
      x.doc_code === docType && x.renew_doc_code === renewal_time.toString()
  );

  if (matchingStamps.length > 0) {
    return matchingStamps[0].stamp_rate;
  } else {
    return 0;
  }
};

exports.bankNoFormat = (bankName) => {
  if (_.isNil(bankName)) {
    return 10;
  } else if (_.includes(bankName.value, "ออมสิน")) {
    return [12, 15];
  } else if (
    _.includes(bankName.value, "เกียรตินาคิน") ||
    _.includes(bankName.value, "ทิสโก้")
  ) {
    return 14;
  } else if (
    _.includes(bankName.value, "ธอส.") ||
    _.includes(bankName.value, "ธกส.")
  ) {
    return 12;
  } else {
    return 10;
  }
};
