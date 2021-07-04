interface MoneyFormatProps {
  balance: number,
  decimalChar?: string,
  decimalCount?: number,
  isNotRounded?: boolean,
  thousandChar?: string,
}

export const moneyFormat = ({
  balance,
  decimalChar = '.',
  decimalCount = 2,
  isNotRounded,
  thousandChar = ','
}: MoneyFormatProps) => {
  const negativeSign = balance < 0 ? '-' : '';
  const newBalance = Math.abs(balance);

  const balanceString: string = parseInt(newBalance.toFixed(decimalCount), 10).toString();
  const thousanCount: number = balanceString.length > 3 ? balanceString.length % 3 : 0;

  const moneyIntFormat: string =
    negativeSign +
    (thousanCount ? balanceString.substr(0, thousanCount) + thousandChar : '') +
    balanceString.substr(thousanCount).replace(/(\d{3})(?=\d)/g, `$1${thousandChar}`);

  const decimalSeed = Math.abs(balance - parseInt(balanceString, 10));
  const decimals = isNotRounded ? Math.floor(decimalSeed * 100) / 100 : decimalSeed;

  const moneyDecimalFormat: string = decimalCount
    ? decimalChar + decimals.toFixed(decimalCount).slice(-2)
    : '';

  return `${moneyIntFormat}${moneyDecimalFormat}`;
}