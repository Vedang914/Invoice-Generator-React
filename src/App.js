// src/App.js

import React from 'react';
import Invoice from './components/Invoice';
import './App.css';

const App = () => {
  const sellerDetails = {
    name: 'Varasiddhi Silk Exports',
    address: '75, 3rd Cross, Lalbagh Road',
    city: 'BENGALURU',
    state: 'KARNATAKA',
    pincode: '560027',
    panNo: 'AACFV3325K',
    gstNo: '29AACFV3325K1ZY',
    logo: '/path/to/logo.png'
  };

  const placeOfSupply = 'KARNATAKA';
  const billingDetails = {
    name: 'Madhu B',
    address: 'Eurofins IT Solutions India Pvt Ltd., 1st Floor, Maruti Platinum, Lakshminarayana Pura, AECS Layout',
    city: 'BENGALURU',
    state: 'KARNATAKA',
    pincode: '560037',
    stateCode: '29'
  };

  const shippingDetails = {
    name: 'Madhu B',
    address: 'Eurofins IT Solutions India Pvt Ltd., 1st Floor, Maruti Platinum, Lakshminarayana Pura, AECS Layout',
    city: 'BENGALURU',
    state: 'KARNATAKA',
    pincode: '560037',
    stateCode: '29'
  };

  const placeOfDelivery = 'KARNATAKA';
  const orderDetails = {
    orderNo: '403-3225714-7676307',
    orderDate: '28.10.2019'
  };

  const invoiceDetails = {
    invoiceNo: 'KA-310565025-1920',
    invoiceDate: '28.10.2019'
  };

  const reverseCharge = false;

  const items = [
    {
      description: 'Varasiddhi Silks Men\'s Formal Shirt (SH-05-42, Navy Blue, 42) B07KGF3KW8 ( SH-05-42 )',
      unitPrice: 338.10,
      quantity: 1,
      discount: 0,
      taxRate: 18
    },
    {
      description: 'Shipping Charges',
      unitPrice: 30.96,
      quantity: 1,
      discount: 0,
      taxRate: 18
    }
  ];

  const signatureImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAA81BMVEX///8AAAC0tLTi4uL///78//////z///v//f/i4uD4///3///8//3//fz///P7/v///+z/+/bv//////H/+v7SxapjcH7e9fzx4ctsV0wOL0urmoKCmqf/+uOZfWkvO0/C2OiGZloNIDWwpIgAABqguMXh0rw+JBguRWEQAAB0g5K7rp50lKr669pRQjpTXXPY7PmLd2QgLDy7y9NTQDJRW2Sio6E3LSOZssfhw6sGDAlAUGPR5+ylinEAAygLCQkUFhlHNSuNkI0bDgOMo7kJFCZyYlIqIRonCAA4Vm1kU0EuN1JlSDnl08ItFgA5RFLSz8ZMvB2XAAADSUlEQVR4nO3aW3MbNRjGcb1Yp2il3awNJKUYDG1T0lDa9AC0hHOgnMv3/zSVtPZM2gvvThkw7vx/F5mN90bzzKvjSikAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/iNa7bsGessPfanjaaXP2R604HYfnTXqaOpzCKK+dVX5dfcYMsWlqb5KSlnWbnlvizL9tXmCEdq6UX9S5/pRzQ2S1+zL2TZDHOp9ji3XkK1VYqk8ZS+lNpL2JObXaaa22qf62qUOM8SY0uefWoc6ovveqK9Mv8U1kQvDe9s4Z1RmV6hi46zbtC9v3XdOot10Z/6wOTefTOj2mjnH2HZF3j5pORRPa42vy3jz2fR4JjaH/TuAOr4u8Pw++M+3yA/lw1YS6CDTGEd842y4/ko9XIU8ahzfk5q3GdKGuXSzrvgm0W5zclk/mwbXHp3LnyNgYQ3lBeFNo2x6eiXwa3N3P5N79xlgXS/mxZZtEW+funsvNVXsuDx6GYLTWhvgmy8uVxckjefz5F/KlGYY9s+s27ZFgUt8+kadP5V6ef1U5OVgfAJLiOB2j92XJIl9d5CVz3rGpetji1XCKgK20jT61y69FvrkIXbK55nweDrVXhvimMMotnsi335XVS552u3LcUs9biG8S2x5/L49/+FEumyZGo3LxDV87dt2wfZBy1z2Xn1btz/Jg1TQhL/zW8WGKfnl2KpemPXlWls2hFN9Qd1TfOO3ak1/k17lu2+sid/La5ep3I2yllV0sf5Pf7zfKu8M/6pFBGr53cGQwRpcd2yIPfLfmjep0++df8jwHaW352MuubUwuMOfOcpc9aozqOtXeOM1bD5PjC5TeOJ/z+/uZPL9ogk2pTCLnIpfKpnLUvOvG/e8lX69n5G1vqIWoVJv/aVJOkvim0OWOgQkmr5VVsj7v4FIIyaVyXsCBwRbriSF336RjjJ3pfPlCWQuv9GNFfNusL1D5lONzMeT4VL1slZJW3pf0iA//itlsdnAwqw7q88bVFwebJ7wkKcHrm6m38PrSrseON4Be32DRtqz5dJ1qy4xbjmDKZT+WzVu9Et+V+3zE989w0gIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALBTLwDfRi63bG1ybgAAAABJRU5ErkJggg==';
  const logo = 'data:image/jpeg;base64,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';

  return (
    <div className="App">
      <Invoice
        sellerDetails={sellerDetails}
        placeOfSupply={placeOfSupply}
        billingDetails={billingDetails}
        shippingDetails={shippingDetails}
        placeOfDelivery={placeOfDelivery}
        orderDetails={orderDetails}
        invoiceDetails={invoiceDetails}
        reverseCharge={reverseCharge}
        items={items}
        signatureImage={signatureImage}
        logo={logo}
      />
    </div>
  );
};

export default App;
