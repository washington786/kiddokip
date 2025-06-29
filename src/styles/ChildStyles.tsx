import colors from '@/config/colors';
import appFonts from '@/config/fonts';
import { StyleSheet } from 'react-native'

export const ChildStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 8
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        color: colors.gray[600],
        fontFamily: `${appFonts.bold}`
    },
    addButton: {
        backgroundColor: colors.primary[600],
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: '#f3f4f6',
    },
    activeFilter: {
        backgroundColor: '#3b82f6',
    },
    filterText: {
        color: '#666',
    },
    activeFilterText: {
        color: 'white',
        fontWeight: 'bold',
    },
    childCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: colors.slate[50],
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedChildCard: {
        backgroundColor: colors.primary[100],
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: colors.primary[600],
        fontWeight: 'bold',
    },
    childInfo: {
        flex: 1,
    },
    childName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    childDetails: {
        fontSize: 14,
        color: '#666',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 12,
    },
    activeBadge: {
        backgroundColor: '#dcfce7',
    },
    transferredBadge: {
        backgroundColor: '#fee2e2',
    },
    graduatedBadge: {
        backgroundColor: '#fef9c3',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
    },
    batchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
    },
    batchTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    selectionCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCircle: {
        backgroundColor: colors.primary[500],
        borderColor: colors.primary[500],
    },
    ageFilterContainer: {
        padding: 12,
        backgroundColor: colors.gray[50],
        borderRadius: 8,
        marginBottom: 12,
    },
    batchFooter: {
        paddingVertical: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: colors.gray[100],
    },
    batchButton: {
        backgroundColor: colors.primary[500],
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    batchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});