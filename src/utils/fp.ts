import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs';

export class Fingerprint {
    static #agentPromise: Promise<GetResult> | null = null;
    
    static get agent(): Promise<GetResult> {
        this.#agentPromise ??= (async () => (await FingerprintJS.load({
            debug: false
        })).get())();
        return this.#agentPromise!;
    }

    static get visitorId(): Promise<string> {
        return this.agent.then(async agent => agent.visitorId);
    }
}
void Fingerprint.agent;