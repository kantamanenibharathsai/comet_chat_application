import {
  indianFlag,
  usaFlag,
  ukFlag,
  russiaFlag,
  spainFlag,
  franceFlag,
} from "../assets/login_images/LoginImages";

interface CountryPhoneNumCode {
  countryId: number;
  countryFlagUrl: string;
  countryCode: number;
}

const countryPhoneNumCodes: CountryPhoneNumCode[] = [
  { countryId: 91, countryFlagUrl: indianFlag, countryCode: 91 },
  { countryId: 1, countryFlagUrl: usaFlag, countryCode: 1 },
  { countryId: 44, countryFlagUrl: ukFlag, countryCode: 44 },
  { countryId: 7, countryFlagUrl: russiaFlag, countryCode: 7 },
  { countryId: 34, countryFlagUrl: spainFlag, countryCode: 34 },
  { countryId: 33, countryFlagUrl: franceFlag, countryCode: 33 },
];

export default countryPhoneNumCodes;
