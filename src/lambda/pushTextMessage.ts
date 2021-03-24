import {
  Context,
  SNSEvent
} from "aws-lambda";
import * as AWS from "aws-sdk";

export const handler = async (event: SNSEvent, context: Context): Promise<any> => {
  try {
    const publishText = new AWS.SNS();
    let publishPromises: any[] = [];
    event.Records.forEach((record: any) => {
      const params: AWS.SNS.PublishInput = {
        Message: `${record.body.message}`,
        PhoneNumber: `${record.body.mobilePhone}`,
        TopicArn: 'arn:aws:sns:eu-west-2:423987200224:pushTextMessageTopic',
      };

      publishPromises.push(publishText.publish(params).promise());
    });

    await Promise.all(publishPromises);
    return {
      statusCode: 200,
      body: "Success",
    }; 
  } catch (error) {
    console.log(`An error occured: ${JSON.stringify(error)}`);
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
}
