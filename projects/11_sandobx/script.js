// console.log("data", data);
console.log("_", _);
let transactions = data.transaction;
// let displayTransactions = transactions.splice(0, 1);
// console.log("displayTransactions", displayTransactions);
// Assuming `transactions` is your array of transactions
const groupedTransactions = _.groupBy(
  transactions,
  (transaction) => transaction.receiver.uid
);
console.log("groupedTransactions", groupedTransactions);

const formattedData = Object.entries(groupedTransactions).map(
  ([uid, transactions]) => {
    console.log("uid, transactions", uid, transactions);
    // Calculate total received amount and transfer fee
    const totalReceivedAmount = transactions.reduce(
      (sum, transaction) =>
        sum +
        (transaction.payment_details.destination.actual_payout_amount || 0),
      0
    );

    const totalTransferFee = transactions.reduce(
      (sum, transaction) =>
        sum + (transaction.payment_details.fees.charges || 0),
      0
    );

    // Build the formatted object for each receiver
    return {
      receiverName:
        transactions[0].receiver.name.first_name +
        " " +
        transactions[0].receiver.name.last_name,
      receiverUid: uid,
      totalReceivedAmount: totalReceivedAmount.toString(),
      totalTransferFee: totalTransferFee.toString(),
      transactionDetails: transactions.map((transaction) => ({
        fillingDate: transaction.filing_date,
        receiverCorridor: transaction.receiver.address.country_iso_code || "",
        deliveryMethod:
          transaction.payment_details.payment_method.payment_type || "",
        transactionId: transaction.money_transfer_control.mtcn || "",
        sendAmount:
          transaction.payment_details.origination.principal_amount || "",
        transferFee: transaction.payment_details.fees.charges || "",
        amountReceived:
          transaction.payment_details.destination.actual_payout_amount || "",
      })),
    };
  }
);
console.log(formattedData);
//////////////////////////////////////////////////////////////////////////////
