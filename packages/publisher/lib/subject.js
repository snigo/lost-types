/**
 * Self-invoking function Subject wraps Subject class in order to provide
 * hidden function and property __done in the scope
 */
const Subject = (() => {
  /**
   * @function __invokable Returns boolean indicating whether subject is invokable
   *
   * @param {string} key Key to be checked
   */
  function __invokable(key) {
    return (
      !this.done
      && Object.prototype.hasOwnProperty.call(this.subject, key)
      && typeof this.subject[key] === 'function'
    );
  }


  /**
   * @property {WeakMap<Subject, boolean>} __done Map that stores state of the subjects
   */
  const __done = new WeakMap();


  /**
   * @class Subject initializes new subject instance, used as a wrapper for subject objects
   * passed with Publisher.prototype.subscribe() method
   */
  class Subject {
    /**
     * Initializes __done Map and sets read-only property subject
     * that will store original subject object
     *
     * @param {any} subject Original subject object passed with Publisher.prototype.subscribe()
     */
    constructor(subject) {
      Object.defineProperties(this, {
        subject: {
          value: subject,
        },
      });
      __done.set(this, false);
    }


    /**
     * @property done Returns boolean indicating if subject is actual
     */
    get done() {
      return __done.get(this);
    }


    /**
     * @method next Invokes subject callback for provided key with given value
     *
     * @param {string} key Key to be updated
     * @param {any} value Value to be passed to callback
     */
    next(key, value) {
      if (__invokable.call(this, key)) {
        this.subject[key](value);
      }
    }


    /**
     * @method complete Completes the subject.
     * Subject will not be able to pass any values to subscribers
     */
    complete() {
      __done.set(this, true);
    }


    /**
     * @method delete Deletes given key from the subject.
     *
     * @param {string} key Key to be removed.
     */
    delete(key) {
      if (__invokable.call(this, key)) {
        delete this.subject[key];
      }
    }
  }

  return Subject;
})();

module.exports = Subject;
