import { createColumnHelper } from '@tanstack/angular-table';
import { Article } from '../../models/Article';

const columnsHelper = createColumnHelper<Article>();

export const defaultColumn = [
    columnsHelper.accessor('libelle', {
        header: 'Libelle',
        cell: (props) => props.getValue(),
    }),
    columnsHelper.accessor('prix_unitaire', {
        header: 'Prix Unitaire',
        cell: (props) => props.getValue(),
    }),
    columnsHelper.display({
        header: 'Actions',
        cell: (props) => `
          <button class="p-button p-button-info p-button-sm mr-2" type="button">
            <i class="pi pi-pencil"></i>
          </button>
          <button class="p-button p-button-danger p-button-sm" type="button">
            <i class="pi pi-trash text-red-600"></i>
          </button>
        `,
    }),
];
