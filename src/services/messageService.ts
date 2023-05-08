export class MessageService {
  private client;
  constructor() {
    const accountSid = "ACfed1f8ed5497689c8e6c98e54859b510";
    const authToken = "c839ccc42563662dad0f1bb3765e4105";
    this.client = require("twilio")(accountSid, authToken);
  }
  public async send(to: string, body: string) {
    to.trimStart();
    to.trimEnd();
    to.trim();
    if (to.startsWith("0")) {
      to = to.slice(1);
    }

    console.log(to);
    try {
      const messageSent = await this.client.messages.create({
        body,
        from: "+15674722219",
        to: `+972${to}`,
      });
      console.log(messageSent);
    } catch (error) {
      throw new Error(error);
    }
  }
}
