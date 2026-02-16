import { API } from './utils/api.js';
import { Fingerprint } from './utils/fp.js';
import { WordCloud } from './charts/wordcloud.js';
import { Utils } from './utils/utils.js';

const visitorId = await Fingerprint.visitorId;
console.log('Fingerprint visitor ID:', visitorId);

Utils.testAppend('Fingerprint visitor ID: ' + visitorId);