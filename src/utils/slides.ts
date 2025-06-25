import { Slide } from "../types/slides";


export const slides: Slide[] = [
    {
        id: 'welcome',
        title: 'Welcome to Kiddokip',
        description:
            'Kiddokip is your trusted partner in managing crèche operations — from registration to daily updates — all tailored for South African childcare professionals.',
        image: require('../../assets/w1.png'),
    }
    ,
    {
        id: '2',
        title: 'Streamlined Child Registration',
        description: 'Digitally register children with photos, ID numbers, and medical details in seconds. Easily transfer children between crèches with complete audit trails.',
        image: require(`../../assets/w2.png`),
    },
    {
        id: '3',
        title: 'Stay Informed Everywhere',
        description:
            'Receive real-time updates from social workers and use full app functionality even without internet. All data syncs automatically when back online.',
        image: require(`../../assets/w3.png`),
    },
];



//     {
//         id: 'transfer',
//         title: 'Seamless Transfers',
//         description: 'Easily transfer children between crèches with complete audit trails.',
//         image: require('../../assets/onboarding/transfer.png'),
//         buttonLabel: 'Next'
//     },
//     {
//         id: 'offline',
//         title: 'Work Anywhere',
//         description: 'Full functionality even without internet - data syncs automatically when back online.',
//         image: require('../../assets/onboarding/offline.png'),
//         buttonLabel: 'Continue'
//     },
//     {
//         id: 'ready',
//         title: "You're All Set!",
//         description: 'Start managing your crèche more efficiently today.',
//         image: require('../../assets/onboarding/ready.png'),
//         buttonLabel: 'Begin Using KiddoKip'
//     }
// ];