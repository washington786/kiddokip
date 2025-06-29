export type navigationTypes = {
    login: undefined;
    register: undefined;
    walkthrough: undefined;
    createCreche: undefined;
    home: undefined;
    reports: undefined;
    profile: undefined;
    children: undefined;
    app: undefined;
    RegisterChild: undefined;
    ChildProfile: {
        childId: string
    };
    EditChild: {
        childId: string
    };
    TransferChildren: {
        childId: string[],
        currentCrecheId?: string
    }
}