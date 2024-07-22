import { applyDecorators } from '@nestjs/common';
import {
  WHERE_OPTION_METADATA,
  WHERE_OPTION_NAME_METADATA,
  WHERE_OPTION_TYPE_METADATA,
  WHERE_OPTION_ENTITY_METADATA,
} from './constants';
import { WhereOperator } from './enums';

export type WhereOption = {
  type?: WhereOperator;
  name?: string;
  entity?: string;
};

export function WhereOption(option: WhereOption) {
  return applyDecorators(
    Reflect.metadata(WHERE_OPTION_METADATA, true),
    Reflect.metadata(
      WHERE_OPTION_TYPE_METADATA,
      option.type || WhereOperator.Equal,
    ),
    Reflect.metadata(WHERE_OPTION_NAME_METADATA, option.name),
    Reflect.metadata(WHERE_OPTION_ENTITY_METADATA, option.entity),
  );
}
