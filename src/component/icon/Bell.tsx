import React from 'react';

import BellLight from './BellLight';
import BellDark from './BellDark';

export default function Bell({ isBGLight, isActive }) {
    return isBGLight
        ? <BellDark isActive={isActive} />
        : <BellLight isActive={isActive} />;
}
