import * as T from "typanion";

const baseEvent = {
    time: T.isNumber(),
    tag: T.isOptional(T.isString()),
};

const mouseEvent = T.isObject({
    ...baseEvent,
    x: T.isNumber(),
    y: T.isNumber(),
    kind: T.isLiteral("click"),
});

const mouseMovementEvent = T.isObject({
    ...baseEvent,
    x: T.isNumber(),
    y: T.isNumber(),
    kind: T.isLiteral("mouse-movement"),
});

const submitEvent = T.isObject({
    ...baseEvent,
    kind: T.isLiteral("submit"),
});

const pageViewEvent = T.isObject({
    ...baseEvent,
    kind: T.isLiteral("page-view"),
});

const pageLeaveEvent = T.isObject({
    ...baseEvent,
    kind: T.isLiteral("page-leave"),
});

const navigateEvent = T.isObject({
    ...baseEvent,
    kind: T.isLiteral("navigate"),
    path: T.isString()
});

export const isEventSchema = T.isObject({
    user: T.isObject({
        id: T.isString(),
        lastVisit: T.isNumber(),
        firstVisit: T.isNumber(),
    }),
    page: T.isObject({
        path: T.isString(),
        title: T.isString(),
        queryParams: T.isRecord(T.isString()),
        window: T.isObject({
            height: T.isNumber(),
            width: T.isNumber(),
        }),
    }),
    device: T.isObject({
        ua: T.isString(),
        connection: T.isOptional(
            T.isObject({
                speed: T.isNumber(),
                type: T.isString(),
            })
        ),
    }),
    events: T.isArray(
        T.isOneOf([mouseEvent, mouseMovementEvent, pageViewEvent, pageLeaveEvent, submitEvent, navigateEvent])
    ),
});
