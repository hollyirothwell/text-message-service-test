import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";
import * as AWS from "aws-sdk";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const params: AWS.SNS.PublishInput = {
      Message: `${event.body}`,
      TopicArn: 'arn:aws:sns:eu-west-2:423987200224:TextMessageTopic',
    };

    const notificationService = new AWS.SNS();

    const response = await notificationService.publish(params).promise();
    const body = {
      messageId: response.MessageId,
      method: `${event.httpMethod}/${event.path}`,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(body),
    };
  } catch (error) {
    console.log(`An error occured: ${JSON.stringify(error)}`);
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
}
