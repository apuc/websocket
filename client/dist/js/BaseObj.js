class BaseObj {

    ID(id) {
        return document.getElementById(id);
    }

    merge(target, source, errorHandler = null) {
        let sourceKeys = [];

        if (!target || typeof target !== 'object') {
            throw new TypeError('Target must be a valid object');
        }

        if (Array.isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                sourceKeys.push(i);
            }
        } else if (source) {
            sourceKeys = Reflect.ownKeys(source);
        }

        // Iterate through all keys of the source object

        for (let i = 0; i < sourceKeys.length; i++) {
            const key = sourceKeys[i];
            const descriptor = Object.getOwnPropertyDescriptor(source, key);

            // Skip non-enumerable getters

            if (typeof descriptor.get === 'function' && !descriptor.enumerable) continue;

            if (typeof source[key] !== 'object' || source[key] === null) {
                // All non-object primitives or nulls

                try {
                    target[key] = source[key];
                } catch (err) {
                    // Catch and handle assignment errors

                    if (typeof errorHandler !== 'function') throw err;

                    errorHandler(err, target);
                }
            } else if (Array.isArray(source[key])) {
                // Arrays

                if (!target[key]) {
                    target[key] = [];
                }

                this.merge(target[key], source[key], errorHandler);
            } else {
                // Objects

                if (!target[key]) {
                    target[key] = {};
                }

                this.merge(target[key], source[key], errorHandler);
            }
        }

        return target;
    }
}