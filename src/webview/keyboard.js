const register_keyboard_handling = (target_className) => {
    let flag = true;
    const targets = document.getElementsByClassName(target_className);
    const getNearestNodePreceding = () => {
        /*
        主に,上矢印を使用した場合を想定
        */
        const active_element = document.activeElement;
        if (!active_element) {
            return;
        }
        if (active_element.compareDocumentPosition(targets[0]) !== active_element.DOCUMENT_POSITION_PRECEDING) {
            return;
        }
        for (let i = targets.length - 1; i >= 0; i--) {
            //console.log(String(i), active_element.compareDocumentPosition(targets[i]))
            if (active_element.DOCUMENT_POSITION_PRECEDING === active_element.compareDocumentPosition(targets[i])) {
                targets[i].focus();
                break;
            }
        }
    }

    const getNearestNodeFollowing = () => {
        /*
        主に,下矢印を使用した場合を想定
        */
        const active_element = document.activeElement;
        if (!active_element) {
            return;
        }

        for (let i = 0; i < targets.length; i++) {
            //console.log(active_element.compareDocumentPosition(targets[i]))
            if (active_element.DOCUMENT_POSITION_FOLLOWING === active_element.compareDocumentPosition(targets[i])) {
                targets[i].focus();
                break;
            }
        }
    }

    window.addEventListener("keydown", (e) => {
        //console.log(e.keyCode);

        switch (e.keyCode) {
            case 74://j
            case 40: {
                if (!flag) {
                    return;
                }
                flag = false;
                console.log(e.keyCode)
                //arrow down
                if (document.activeElement.tagName === "BODY") {
                    targets[0].focus();
                    return;
                }
                getNearestNodeFollowing();
                flag = true
                return;
            }
            case 75://k
            case 38: {
                if (!flag) {
                    return;
                }
                flag = false
                //arrow up
                getNearestNodePreceding();
                flag = true
                return;
            }
        }
    });
}
export default register_keyboard_handling;