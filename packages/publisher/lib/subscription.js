/**
 * @class Subscription Initialized new subscription instance
 */
class Subscription {
  /**
   * Sets read-only properties id and publisher
   *
   * @param {number} id The subscription Id
   * @param {Publisher} publisher Publisher class that issued the subscription
   */
  constructor(id, publisher) {
    Object.defineProperties(this, {
      id: {
        value: id,
      },
      publisher: {
        value: publisher,
      },
    });
  }


  /**
   * @method unsubscribe Unsubscribes from provided key.
   * If no key provided, unsubscribes from every key.
   *
   * @param {string} key Optional parameter, the key to unsubscribe from
   */
  unsubscribe(key) {
    this.publisher.unsubscribe(this.id, key);
  }
}

module.exports = Subscription;
