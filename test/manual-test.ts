import { AutoLog } from "../src";
import { LogFunction } from "../src/base";
import { AutoLogLevel, AutoLogBypass } from "../src/method-decorators";
import { AutoLogPropBypass } from "../src/propery-decorators";

const logger: LogFunction = (ctr, targetKey, targetValue, _level) => {
  console.log(`${ctr.name}.${targetKey.toString()}`, targetValue);
};

@AutoLog({ logger, level: "debug", enablePropertyLoging: true })
class ETransferContactProviderAdapter {
  private a = "foo";
  private b = "bar";
  private c = "baz";

  private d = "qux";
  private e = "quuz";

  @AutoLogPropBypass
  private f = "corge";

  @AutoLogLevel("debug")
  private sanitize(str: string): string {
    this.d;
    this.e;
    this.f;

    return `A String ${str}`;
  }

  @AutoLogBypass
  private doSomething(str: string): string {
    this.d;
    this.e;
    this.f;

    return `A String ${str}`;
  }

  createETransferContact(args: { a: string; b: string }): string {
    this.a;
    this.b;
    this.c;

    this.doSomething("something");

    return this.sanitize(args.a);
  }
}

const adapter = new ETransferContactProviderAdapter();

adapter.createETransferContact({ a: "Hello", b: "World" });
