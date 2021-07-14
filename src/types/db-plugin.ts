import type { FindOrCreateResult } from "@typegoose/typegoose/lib/defaultClasses";
import type { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import type { NativeError } from 'mongoose';

type Cb<T> = (err: NativeError, doc: FindOrCreateResult<T>) => any;

export abstract class FindOrCreate {
  static findOrCreate: <T extends FindOrCreate>(
    this: AnyParamConstructor<T>,
    condition: any,
    options?: any,
    cb?: Cb<T>
  ) => Promise<FindOrCreateResult<T>>;
}
