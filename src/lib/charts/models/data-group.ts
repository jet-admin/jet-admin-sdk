
export class DataGroup {
  public group: string;
  public value: string;

  deserialize(data: Object) {
    this.group = data['group'];
    this.value = data['y_func'];

    return this;
  }
}
