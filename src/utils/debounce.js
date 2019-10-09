export default function (func, timer) {
    let task
    return function (...args) {
        if (task)
            clearTimeout(task)
        task = setTimeout(() => {
            func.apply(this, args)
        }, timer);
    }
}