import dotenv from 'dotenv';

dotenv.config();

// This utility function is used to help use debug wether
// Required environment variables are missing.
const isRequired = (env: string | undefined, label?: string) => {
  if (!env) throw Error(`Environment variable is required ${label ? ': ' + label : '.'}`);
  return env;
};

const { NORDNET_USERNAME, NORDNET_PASSWORD } = process.env;

const username = isRequired(NORDNET_USERNAME, 'NORDNET_USERNAME');
const password = isRequired(NORDNET_PASSWORD, 'NORDNET_PASSWORD');

export { username, password };
