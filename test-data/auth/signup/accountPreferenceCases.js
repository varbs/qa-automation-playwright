const { ACCOUNT_OPTIONS } = require('../../../constants/accountOptions');

const accountPreferenceCases = [
    {
        option: ACCOUNT_OPTIONS.NEWSLETTER,
        label: 'Newsletter subscription',
        checked: true,
        set: (accountInfoPage, checked) => accountInfoPage.setNewsletterSubscription(checked),
        verify: (accountInfoPage, checked) => accountInfoPage.verifyNewsletterSubscription(checked)
    },
    {
        option: ACCOUNT_OPTIONS.NEWSLETTER,
        label: 'Newsletter subscription',
        checked: false,
        set: (accountInfoPage, checked) => accountInfoPage.setNewsletterSubscription(checked),
        verify: (accountInfoPage, checked) => accountInfoPage.verifyNewsletterSubscription(checked)
    },
    {
        option: ACCOUNT_OPTIONS.SPECIAL_OFFERS,
        label: 'Special Offers',
        checked: true,
        set: (accountInfoPage, checked) => accountInfoPage.setSpecialOffersSubscription(checked),
        verify: (accountInfoPage, checked) => accountInfoPage.verifySpecialOffersSubscription(checked)
    },
    {
        option: ACCOUNT_OPTIONS.SPECIAL_OFFERS,
        label: 'Special Offers',
        checked: false,
        set: (accountInfoPage, checked) => accountInfoPage.setSpecialOffersSubscription(checked),
        verify: (accountInfoPage, checked) => accountInfoPage.verifySpecialOffersSubscription(checked)
    }
]

module.exports = { accountPreferenceCases };

