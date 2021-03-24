import { handler } from './sendTextMessage';
import { Lambda } from "aws-sdk"
import jestConfig from '../../jest.config';
import { APIGatewayEvent } from 'aws-lambda';

jest.mock('aws-sdk', () => {
  const mockLambda = {invoke: jest.fn()};
  return {
    Lambda: jest.fn(() => mockLambda),
  };
});

describe("sendTextMessage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Sends a request for a text message", async () => {
    const mockSendTextMessage = new Lambda();
    const mockResponse = {};

    (mockSendTextMessage.invoke as jest.Mock).mockImplementationOnce(() => {
      return mockResponse;
    });

    const response = await handler({} as APIGatewayEvent);
    expect(response).toEqual({});
    expect(mockSendTextMessage.invoke).toBeCalledWith({
      FunctionName: 'sendTextMessage',
      Payload: {},
    });
  });

  it("Throws an error", async () => {
    const mockSendTextMessage = new Lambda();
    const mockResponse = new Error('something bad happened');

    (mockSendTextMessage.invoke as jest.Mock).mockImplementationOnce(() => {
      return mockResponse;
    });

    await expect(handler({} as APIGatewayEvent)).rejects.toThrow('something bad happened');
    expect(mockSendTextMessage.invoke).toBeCalledWith({
      FunctionName: 'sendTextMessage',
      Payload: {},
    });
  });
});
