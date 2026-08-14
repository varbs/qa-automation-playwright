const { ACCOUNT_OPTIONS } = require('../../../constant/accountOptions');

const accountPreferenceCases = [
    {
        option: ACCOUNT_OPTIONS.NEWSLETTER,
        label: 'Newsletter subscription',
        checked: true
    },
    {
        option: ACCOUNT_OPTIONS.NEWSLETTER,
        label: 'Newsletter subscription',
        checked: false
    },
    {
        option: ACCOUNT_OPTIONS.SPECIAL_OFFERS,
        label: 'Special Offers',
        checked: true
    },
    {
        option: ACCOUNT_OPTIONS.SPECIAL_OFFERS,
        label: 'Special Offers',
        checked: false
    }
]

module.exports = { accountPreferenceCases };

