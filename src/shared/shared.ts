import { Creditor, Data, Debtor } from "./types";
import { isIBANValid, isQRIBAN, isQRReference, isQRReferenceValid } from "./utils.js";


export function cleanData(data: Data): Data {

  const _cleanObject = (object: Creditor | Data | Debtor): void => {

    const keys = Object.keys(object);

    for(let k = 0; k < keys.length; k++){
      if(typeof object[keys[k]!] === "string"){

        object[keys[k]!] = removeLineBreaks(object[keys[k]!]);

        if(keys[k] === "account"){
          object[keys[k]!] = object[keys[k]!].replace(/ /g, "");
        }
        if(keys[k] === "reference"){
          object[keys[k]!] = object[keys[k]!].replace(/ /g, "");
        }
        if(keys[k] === "country"){
          object[keys[k]!] = object[keys[k]!].toUpperCase();
        }

      } else {
        if(typeof object[keys[k]!] === "object"){
          _cleanObject(object[keys[k]!]);
        }
      }
    }
  };

  _cleanObject(data);

  return data;

}


export function removeLineBreaks(text: string): string {
  return text.replace(/\n/g, "").replace(/\r/g, "");
}


export function validateData(data: Data) {


  //-- Creditor

  if(data.creditor === undefined){ throw new Error("Creditor cannot be undefined."); }


  //-- Creditor account

  if(data.creditor.account === undefined){
    throw new Error("You must provide an IBAN or QR-IBAN number.");
  }

  if(data.creditor.account.length !== 21){
    throw new Error(`The provided IBAN number '${data.creditor.account}' is either too long or too short.`);
  }

  if(isIBANValid(data.creditor.account) === false){
    throw new Error(`The provided IBAN number '${data.creditor.account}' is not valid.`);
  }

  if(data.creditor.account.substr(0, 2) !== "CH" && data.creditor.account.substr(0, 2) !== "LI"){
    throw new Error("Only CH and LI IBAN numbers are allowed.");
  }


  //-- Validate reference

  if(isQRIBAN(data.creditor.account)){

    if(data.reference === undefined){
      throw new Error("If there is no reference, a conventional IBAN must be used.");
    }

    if(isQRReference(data.reference)){
      if(!isQRReferenceValid(data.reference)){
        throw new Error("QR-Reference checksum is not valid.");
      }
    } else {
      throw new Error("QR-IBAN requires the use of a QR-Reference (and vice versa).");
    }

  } else {

    if(data.reference !== undefined){
      if(isQRReference(data.reference)){
        throw new Error("QR-Reference requires the use of a QR-IBAN (and vice versa).");
      }
    }

  }


  //-- Creditor name

  if(data.creditor.name === undefined){ throw new Error("Creditor name cannot be undefined."); }
  if(typeof data.creditor.name !== "string"){ throw new Error("Creditor name must be a string."); }
  if(data.creditor.name.length > 70){ throw new Error("Creditor name must be a maximum of 70 characters."); }


  //-- Creditor Address

  if(data.creditor.address === undefined){ throw new Error("Creditor address cannot be undefined."); }
  if(typeof data.creditor.address !== "string"){ throw new Error("Creditor address must be a string."); }
  if(data.creditor.address.length > 70){ throw new Error("Creditor address must be a maximum of 70 characters."); }


  //-- Creditor buildingNumber

  if(data.creditor.buildingNumber !== undefined){
    if(typeof data.creditor.buildingNumber !== "string" && typeof data.creditor.buildingNumber !== "number"){ throw new Error("Debtor buildingNumber must be either a string or a number."); }
    if(data.creditor.buildingNumber.toString().length > 16){ throw new Error("Creditor buildingNumber can be a maximum of 16 characters."); }
  }


  //-- Creditor Zip

  if(data.creditor.zip === undefined){ throw new Error("Creditor zip cannot be undefined."); }
  if(typeof data.creditor.zip !== "string" && typeof data.creditor.zip !== "number"){ throw new Error("Creditor zip must be either a string or a number."); }
  if(data.creditor.zip.toString().length > 16){ throw new Error("Creditor zip must be a maximum of 16 characters."); }


  //-- Creditor city

  if(data.creditor.city === undefined){ throw new Error("Creditor city cannot be undefined."); }
  if(typeof data.creditor.city !== "string"){ throw new Error("Creditor city must be a string."); }
  if(data.creditor.city.length > 35){ throw new Error("Creditor city must be a maximum of 35 characters."); }


  //-- Creditor country

  if(data.creditor.country === undefined){ throw new Error("Creditor country cannot be undefined."); }
  if(typeof data.creditor.country !== "string"){ throw new Error("Creditor country must be a string."); }
  if(data.creditor.country.length !== 2){ throw new Error("Creditor country must be 2 characters."); }


  //-- Amount

  if(data.amount !== undefined){
    if(typeof data.amount !== "number"){ throw new Error("Amount must be a number."); }
    if(data.amount.toFixed(2).toString().length > 12){ throw new Error("Amount must be a maximum of 12 digits."); }
  }


  //-- Currency

  if(data.currency === undefined){ throw new Error("Currency cannot be undefined."); }
  if(typeof data.currency !== "string"){ throw new Error("Currency must be a string."); }
  if(data.currency.length !== 3){ throw new Error("Currency must be a length of 3 characters."); }
  if(data.currency !== "CHF" && data.currency !== "EUR"){ throw new Error("Currency must be either 'CHF' or 'EUR'"); }


  //-- Debtor

  if(data.debtor !== undefined){


    //-- Debtor name

    if(data.debtor.name === undefined){ throw new Error("Debtor name cannot be undefined if the debtor object is available."); }
    if(typeof data.debtor.name !== "string"){ throw new Error("Debtor name must be a string."); }
    if(data.debtor.name.length > 70){ throw new Error("Debtor name must be a maximum of 70 characters."); }


    //-- Debtor address

    if(data.debtor.address === undefined){ throw new Error("Debtor address cannot be undefined if the debtor object is available."); }
    if(typeof data.debtor.address !== "string"){ throw new Error("Debtor address must be a string."); }
    if(data.debtor.address.length > 70){ throw new Error("Debtor address must be a maximum of 70 characters."); }


    //-- Debtor buildingNumber

    if(data.debtor.buildingNumber !== undefined){
      if(typeof data.debtor.buildingNumber !== "string" && typeof data.debtor.buildingNumber !== "number"){ throw new Error("Debtor house number must be either a string or a number."); }
      if(data.debtor.buildingNumber.toString().length > 16){ throw new Error("Debtor house number can be a maximum of 16 characters."); }
    }


    //-- Debtor zip

    if(data.debtor.zip === undefined){ throw new Error("Debtor zip cannot be undefined if the debtor object is available."); }
    if(typeof data.debtor.zip !== "string" && typeof data.debtor.zip !== "number"){ throw new Error("Debtor zip must be either a string or a number."); }
    if(data.debtor.zip.toString().length > 16){ throw new Error("Debtor zip must be a maximum of 16 characters."); }


    //-- Debtor city

    if(data.debtor.city === undefined){ throw new Error("Debtor city cannot be undefined if the debtor object is available."); }
    if(typeof data.debtor.city !== "string"){ throw new Error("Debtor city must be a string."); }
    if(data.debtor.city.length > 35){ throw new Error("Debtor city must be a maximum of 35 characters."); }


    //-- Debtor country

    if(data.debtor.country === undefined){ throw new Error("Debtor country cannot be undefined if the debtor object is available."); }
    if(typeof data.debtor.country !== "string"){ throw new Error("Debtor country must be a string."); }
    if(data.debtor.country.length !== 2){ throw new Error("Debtor country must be 2 characters."); }

  }


  //-- Reference

  if(data.reference !== undefined){
    if(typeof data.reference !== "string"){ throw new Error("Reference name must be a string."); }
    if(data.reference.length > 27){ throw new Error("Reference name must be a maximum of 27 characters."); }
  }


  //-- Message

  if(data.message !== undefined){
    if(data.message.length > 140){ throw new Error("Message must be a maximum of 140 characters."); }
    if(typeof data.message !== "string"){ throw new Error("Message must be a string."); }
  }


  //-- Additional information

  if(data.additionalInformation !== undefined){
    if(data.additionalInformation.length > 140){ throw new Error("AdditionalInformation must be a maximum of 140 characters."); }
    if(typeof data.additionalInformation !== "string"){ throw new Error("AdditionalInformation must be a string."); }
  }


  //-- Message + Additional information

  if(data.message !== undefined && data.additionalInformation !== undefined){
    if(data.additionalInformation.length + data.message.length > 140){ throw new Error("Message and additionalInformation combined must be a maximum of 140 characters."); }
  }


  //-- AV1

  if(data.av1 !== undefined){
    if(typeof data.av1 !== "string"){ throw new Error("AV1 must be a string."); }
    if(data.av1.length > 100){ throw new Error("AV1 must be a maximum of 100 characters."); }
    if(data.av1.split(/(\/.+)/).length <= 2){ throw new Error("AV1 must contain a separator (e.g. /)"); }
  }


  //-- AV2

  if(data.av2 !== undefined){
    if(typeof data.av2 !== "string"){ throw new Error("AV2 must be a string."); }
    if(data.av2.length > 100){ throw new Error("AV2 must be a maximum of 100 characters."); }
    if(data.av2.split(/(\/.+)/).length <= 2){ throw new Error("AV2 must contain a separator (e.g. /)"); }
  }

}
