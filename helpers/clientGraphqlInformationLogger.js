// Other
import { productionLogger } from './logger';
import { createClientProductionLog } from './createClientProductionLog';

export const clientGraphqlInformationLogger = (query, loggerMessage) => {
  const graphQlDocument = query.query;
  const currentGraphQLDocument = graphQlDocument.definitions[0];
  const operation = 'operation' in currentGraphQLDocument ? currentGraphQLDocument.operation : 'unknown graphQl operation';
  const document = 'name' in currentGraphQLDocument ? currentGraphQLDocument.name && currentGraphQLDocument.name.value : 'unknown graphQl document';
  const action = JSON.stringify({document, operation});
  const message = `GraphQL ${operation} ${action} ${loggerMessage}`;

    createClientProductionLog('graphql',{message});
    productionLogger.log({
    level: 'info',
    message,
  });
};