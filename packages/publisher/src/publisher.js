import Subject from './subject';
import Subscription from './subscription';


/**
 * @property {WeakMap<Publisher, number>} __ids Keeps track of subscription ids
 */
const __ids = new WeakMap();


/**
 * @property {WeakMap<Publisher, Map<number, Subject>>} __subjects Map of subscribed subjects
 */
const __subjects = new WeakMap();


/**
 * @class Publisher Allows to subscribe to any property of the class
 */
class Publisher {
  /**
   * Initializes __ids and __subjects Maps
   */
  constructor() {
    __ids.set(this, 1);
    __subjects.set(this, new Map());
  }


  /**
   * @method subscribe Subscribes to the keys described in the subject object
   *
   * @param {any} subject Subject descriptor
   *
   * @returns {Subscription} Subscription object used for unsubscribing
   */
  subscribe(subject) {
    const _subject = new Subject(subject);

    const id = __ids.get(this);
    __ids.set(this, id + 1);

    const subjects = __subjects.get(this);
    subjects.set(id, _subject);

    return new Subscription(id, this);
  }


  /**
   * @method unsubscribe Unsubscribes provided key from Subject with given id.
   * If no key provided, ubsubscribes from every key.
   *
   * @param {number} id Id of the subject
   * @param {string} key Key of the subject to unsubscribe from
   */
  unsubscribe(id, key) {
    const subjects = __subjects.get(this);

    if (subjects.has(id)) {
      const subscriber = subjects.get(id);

      if (key && typeof subscriber.delete === 'function') {
        subscriber.delete(key);
      }

      if (!key || !Object.keys(subscriber.subject).length) {
        if (typeof subscriber.complete === 'function') subscriber.complete();
        subjects.delete(id);
      }
    }
  }


  /**
   * @method set Adds or updates new key-value pair to the class
   *
   * @param {string} key The key
   * @param {any} value The value to be associated with provided key
   */
  setState(key, value) {
    const subjects = __subjects.get(this);
    [...subjects].forEach(([, subject]) => {
      subject.next(key, value);
    });

    this[key] = value;

    return this;
  }
}

export default Publisher;
