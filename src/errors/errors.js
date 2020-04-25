export class BaseError {
  constructor(props) {
    if (props && props.message) {
      this.message = props.message;
    }

    if (props && props.fields) {
      this.fields = props.fields;
    }
  }
}
