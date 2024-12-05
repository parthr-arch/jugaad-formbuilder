var formSchema = {
    components: [
        {
            type: 'textfield',
            key: 'firstName',
            label: 'First Name',
            placeholder: 'Enter your first name',
            input: true
        },
        {
            type: 'textfield',
            key: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            input: true
        },
        {
            type: 'survey',
            key: 'questions',
            label: 'Survey',
            values: [
                { label: 'Great', value: 'great' },
                { label: 'Good', value: 'good' },
                { label: 'Poor', value: 'poor' }
            ],
            questions: [
                { label: 'How would you rate the platform?', value: 'howWouldYouRateTheFormIoPlatform' },
                { label: 'How was Customer Support?', value: 'howWasCustomerSupport' },
                { label: 'Overall Experience?', value: 'overallExperience' }
            ]
        },
        {
            type: 'button',
            action: 'submit',
            label: 'Submit',
            theme: 'primary'
        }
    ],
};

// var languageSupport = {
//     "language": "en",
//     i18n: {
//         en: {
//             'First Name': 'First Name',
//             'Last Name': 'Last Name',
//             'Enter your first name': 'Enter your first name',
//             'Enter your last name': 'Enter your last name',
//             'Survey': 'Survey',
//             'Submit': 'Submit',
//             'Great': 'Great',
//             'Good': 'Good',
//             'Poor': 'Poor',
//             'How would you rate the platform?': 'How would you rate the platform?',
//             'How was Customer Support?': 'How was Customer Support?',
//             'Overall Experience?': 'Overall Experience?'
//         },
//         jp: {
//             'First Name': '名',
//             'Last Name': '姓',
//             'Enter your first name': '名前を入力してください',
//             'Enter your last name': '苗字を入力してください',
//             'Survey': '調査',
//             'Submit': '送信',
//             'Great': '素晴らしい',
//             'Good': '良い',
//             'Poor': '悪い',
//             'How would you rate the platform?': 'プラットフォームをどう評価しますか？',
//             'How was Customer Support?': 'カスタマーサポートはいかがでしたか？',
//             'Overall Experience?': '全体的な体験はどうでしたか？'
//         }
//     }
// }