
import { customFormat } from './customFormat';

export default function(value, columnFormat, columnUnits) {

  console.error(`columnFormat = ${columnFormat}`);
  let suffix;
  switch(columnUnits){
        case "B":
            value = value / 1000000000; // 1,000,000,000
            suffix = columnUnits;
            break;
        case "M":
            value = value / 1000000; // 1,000,000
            suffix = columnUnits;
            break;
        case "k":
            value = value / 1000; // 1,000
            suffix = columnUnits;
            break;
        default:
            value = value;
            suffix = '';
  }

    // Get format tag from end of column name (if supplied):
    let fmt = columnFormat;

    try{
    switch(fmt){
        case "pct": 
            value = value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 2 })
            break;
        case "usd": 
            value = value.toLocaleString('en-US',{style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2}) + suffix
            break;
        case "cad": 
            value = value.toLocaleString('en-US',{style: 'currency', currency: 'CAD', minimumFractionDigits: 2, maximumFractionDigits: 2}) + suffix
            break;
        case "eur": 
            value = value.toLocaleString('en-US',{style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2}) + suffix
            break;
        case "gbp":
            value = value.toLocaleString('en-US',{style: 'currency', currency: 'GBP', minimumFractionDigits: 2, maximumFractionDigits: 2}) + suffix
            break;
        case "chf":
            value = value.toLocaleString('en-US',{style: 'currency', currency: 'CHF', minimumFractionDigits: 2, maximumFractionDigits: 2}) + suffix
            break;
        case "id":
            value = value;
            break;
        case "num":
            value = value.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}) + suffix
            break;
        case "num2":
            value = value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + suffix
            break;
        case "date": 
            value = value.toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })
            break;
        case "week": 
            value = value.toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })
            break;
        case "month": 
            value = value.toLocaleString('en-US', {month: 'short'});
            break;
        case "qtr": 
            value = value.toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })
            break;
        case "year": 
            value = value.getFullYear();
            break;
        // case "time":
        //     value = value.toLocaleTimeString('en-US')
        //     break;
        case "year_num":
            value = value;
            break;
        case "str":
            value = value.toLocaleString();
            break;
        default:
            try {
                //TODO you have to get this from the settings
                value = customFormat(value, columnFormat);
            } catch(error) {
                value = value.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}) + suffix;
            }
        }
        } catch(error) {
            value = value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + suffix
        }
    return value;
}
  
