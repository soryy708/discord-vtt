import { loadConfig, validateConfig } from './config';
import { bootstrapDiscord } from './discord';

loadConfig();
validateConfig();
bootstrapDiscord();
