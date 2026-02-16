import { API } from './utils/api.js';
import { Fingerprint } from './utils/fp.js';
import { WordCloud } from './charts/wordcloud.js';
import './utils/utils.js';

const visitorId = await Fingerprint.visitorId;
console.log('Fingerprint visitor ID:', visitorId);

$id("test")!.innerText = "Fingerprint visitor ID: " + visitorId;