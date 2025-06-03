import { OpenAPIObject } from '@nestjs/swagger';
import { PathsObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const filterEndpointByVersion = (
    publicDocument: OpenAPIObject,
    versionPrefix: string,
    expects: string[] = []
  ): PathsObject => {
    return Object.entries(publicDocument.paths).reduce((prev, [path, value]) => {
      let foundAny = false;
      for (const expectedItem of expects) {
        if (path.includes(expectedItem)) {
          foundAny = true;
        }
      }
      if (path.indexOf(versionPrefix) == -1 && !foundAny) return prev;
      return { ...prev, [path]: value };
    }, {});
  };