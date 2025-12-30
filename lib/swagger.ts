export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Predix API',
    version: '1.0.0',
    description: 'API for Predix Protocol - Prediction Market Platform',
    contact: {
      name: 'Predix Team',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'Health check endpoints',
    },
    {
      name: 'Markets',
      description: 'Market management endpoints',
    },
    {
      name: 'Generate',
      description: 'AI-powered market generation',
    },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Health'],
        summary: 'Get API information',
        description: 'Returns basic API information and status',
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Predix API' },
                    version: { type: 'string', example: '1.0.0' },
                    status: { type: 'string', example: 'running' },
                    timestamp: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Check if the API is running',
        responses: {
          '200': {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    timestamp: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/markets': {
      get: {
        tags: ['Markets'],
        summary: 'Get all markets',
        description: 'Retrieve a paginated list of prediction markets',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            required: false,
            schema: { type: 'integer', default: 1, minimum: 1 },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of items per page',
            required: false,
            schema: { type: 'integer', default: 10, minimum: 1, maximum: 100 },
          },
          {
            name: 'orderBy',
            in: 'query',
            description: 'Field to order by',
            required: false,
            schema: {
              type: 'string',
              enum: ['createdAt', 'endDate', 'blockchainMarketId'],
              default: 'createdAt',
            },
          },
          {
            name: 'order',
            in: 'query',
            description: 'Order direction',
            required: false,
            schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Market' },
                    },
                    pagination: {
                      type: 'object',
                      properties: {
                        page: { type: 'integer' },
                        limit: { type: 'integer' },
                        total: { type: 'integer' },
                        totalPages: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      post: {
        tags: ['Markets'],
        summary: 'Create a new market',
        description: 'Create a new prediction market',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateMarketInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Market created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Market' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - Missing required fields',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '409': {
            description: 'Conflict - Market already exists',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/api/markets/{id}': {
      get: {
        tags: ['Markets'],
        summary: 'Get market by ID',
        description: 'Retrieve a specific market by its database ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Market ID',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Market' },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Market not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/api/markets/blockchain/{blockchainId}': {
      get: {
        tags: ['Markets'],
        summary: 'Get market by blockchain ID',
        description: 'Retrieve a specific market by its blockchain market ID',
        parameters: [
          {
            name: 'blockchainId',
            in: 'path',
            description: 'Blockchain Market ID',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Market' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid blockchain market ID',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '404': {
            description: 'Market not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/api/generate-market': {
      post: {
        tags: ['Generate'],
        summary: 'Generate market from X/Twitter post',
        description: 'Generate a prediction market from an X/Twitter post URL using AI',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['url'],
                properties: {
                  url: {
                    type: 'string',
                    format: 'uri',
                    example: 'https://x.com/username/status/1234567890',
                    description: 'X/Twitter post URL',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Market generated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/GeneratedMarket' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - Invalid URL',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '422': {
            description: 'Unprocessable - Post cannot be turned into a market',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    reason: { type: 'string' },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Market: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          question: { type: 'string', example: 'Will Bitcoin reach $100k by end of 2024?' },
          description: { type: 'string' },
          imageUrl: { type: 'string', format: 'uri' },
          blockchainMarketId: { type: 'integer' },
          totalPoolSize: { type: 'string' },
          totalYieldUntilEnd: { type: 'string' },
          contractAddress: { type: 'string' },
          endDate: { type: 'string', format: 'date-time' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          author: { $ref: '#/components/schemas/Author' },
          post: { $ref: '#/components/schemas/Post' },
          engagement: { $ref: '#/components/schemas/Engagement' },
          source: { $ref: '#/components/schemas/Source' },
          probability: { $ref: '#/components/schemas/Probability' },
          protocol: { $ref: '#/components/schemas/Protocol' },
          token: { $ref: '#/components/schemas/Token' },
          tvl: { $ref: '#/components/schemas/TVL' },
          actions: {
            type: 'array',
            items: { $ref: '#/components/schemas/Action' },
          },
        },
      },
      Author: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          username: { type: 'string' },
          userId: { type: 'string' },
          avatar: { type: 'string', format: 'uri' },
          verifiedGov: { type: 'boolean' },
          verifiedBlue: { type: 'boolean' },
          verifiedOrange: { type: 'boolean' },
        },
      },
      Post: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          pid: { type: 'string' },
          text: { type: 'string' },
          banner: { type: 'string', format: 'uri', nullable: true },
        },
      },
      Engagement: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          replies: { type: 'integer' },
          reposts: { type: 'integer' },
          likes: { type: 'integer' },
          views: { type: 'integer' },
        },
      },
      Source: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          platform: { type: 'string', example: 'x' },
          url: { type: 'string', format: 'uri' },
        },
      },
      Probability: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          value: { type: 'number', format: 'float' },
          unit: { type: 'string', example: 'percent' },
        },
      },
      Protocol: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          icon: { type: 'string', format: 'uri' },
          apy: { type: 'number', format: 'float' },
        },
      },
      Token: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          icon: { type: 'string', format: 'uri' },
        },
      },
      TVL: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          value: { type: 'number', format: 'float' },
          symbol: { type: 'string' },
        },
      },
      Action: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          label: { type: 'string', example: 'YES' },
          type: { type: 'string', example: 'positive' },
        },
      },
      CreateMarketInput: {
        type: 'object',
        required: [
          'question',
          'description',
          'imageUrl',
          'blockchainMarketId',
          'totalPoolSize',
          'totalYieldUntilEnd',
          'contractAddress',
          'endDate',
          'author',
        ],
        properties: {
          question: { type: 'string' },
          description: { type: 'string' },
          imageUrl: { type: 'string', format: 'uri' },
          blockchainMarketId: { type: 'integer' },
          totalPoolSize: { type: 'string' },
          totalYieldUntilEnd: { type: 'string' },
          contractAddress: { type: 'string' },
          endDate: { type: 'string', format: 'date-time' },
          author: {
            type: 'object',
            required: ['name', 'username', 'userId', 'avatar'],
            properties: {
              name: { type: 'string' },
              username: { type: 'string' },
              userId: { type: 'string' },
              avatar: { type: 'string', format: 'uri' },
              verifiedGov: { type: 'boolean' },
              verifiedBlue: { type: 'boolean' },
              verifiedOrange: { type: 'boolean' },
            },
          },
          post: {
            type: 'object',
            properties: {
              pid: { type: 'string' },
              text: { type: 'string' },
              banner: { type: 'string', format: 'uri', nullable: true },
            },
          },
          engagement: {
            type: 'object',
            properties: {
              replies: { type: 'integer' },
              reposts: { type: 'integer' },
              likes: { type: 'integer' },
              views: { type: 'integer' },
            },
          },
          source: {
            type: 'object',
            properties: {
              platform: { type: 'string' },
              url: { type: 'string', format: 'uri' },
            },
          },
          probability: {
            type: 'object',
            properties: {
              value: { type: 'number', format: 'float' },
              unit: { type: 'string' },
            },
          },
          protocol: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              icon: { type: 'string', format: 'uri' },
              apy: { type: 'number', format: 'float' },
            },
          },
          token: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              icon: { type: 'string', format: 'uri' },
            },
          },
          tvl: {
            type: 'object',
            properties: {
              value: { type: 'number', format: 'float' },
              symbol: { type: 'string' },
            },
          },
          actions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                type: { type: 'string' },
              },
            },
          },
        },
      },
      GeneratedMarket: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          question: { type: 'string' },
          description: { type: 'string' },
          imageUrl: { type: 'string', format: 'uri' },
          author: { $ref: '#/components/schemas/Author' },
          post: {
            type: 'object',
            properties: {
              pid: { type: 'string' },
              text: { type: 'string' },
              banner: { type: 'string', format: 'uri', nullable: true },
              createdAt: { type: 'string' },
            },
          },
          probability: { $ref: '#/components/schemas/Probability' },
          engagement: { $ref: '#/components/schemas/Engagement' },
          source: { $ref: '#/components/schemas/Source' },
          market: {
            type: 'object',
            properties: {
              blockchainMarketId: { type: 'integer', nullable: true },
              contractAddress: { type: 'string', nullable: true },
              tvl: { type: 'object', nullable: true },
              protocol: { type: 'object', nullable: true },
              token: { type: 'object', nullable: true },
              endDate: { type: 'string', format: 'date-time', nullable: true },
              totalPoolSize: { type: 'string', nullable: true },
              totalYieldUntilEnd: { type: 'string', nullable: true },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
          actions: {
            type: 'array',
            items: { $ref: '#/components/schemas/Action' },
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
};
