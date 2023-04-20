import { Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import NestedTablesExampleAsyncWithSorting from '~/examples/NestedTablesExampleAsyncWithSorting';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/nested-tables-with-async-data-loading-and-sorting';

type ExampleName = 'useStyles' | 'NestedTablesExampleAsyncWithSorting' | 'DepartmentsTable' | 'EmployeesTable';

export const getStaticProps: GetStaticProps<{
  code: { example: Record<ExampleName, string>; data: string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      example: readCodeExample('examples/NestedTablesExampleAsyncWithSorting.tsx') as Promise<
        Record<ExampleName, string>
      >,
      data: readCodeExample('data/nested.ts') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Click on the column headers and the expandable rows in the table below to see it in action:</PageText>
      <NestedTablesExampleAsyncWithSorting />
      <CodeBlockTabs
        items={[
          {
            title: 'NestedTablesExampleAsyncWithSorting.tsx',
            language: 'typescript',
            content: code.example['NestedTablesExampleAsyncWithSorting'],
          },
          {
            title: 'DepartmentsTable.tsx',
            language: 'typescript',
            content: code.example['DepartmentsTable'],
          },
          {
            title: 'EmployeesTable.tsx',
            language: 'typescript',
            content: code.example['EmployeesTable'],
          },
          { title: 'useStyles.ts', language: 'typescript', content: code.example['useStyles'] },
          { title: 'data/nested.ts', language: 'typescript', content: code.data },
        ]}
      />
      <PageNavigation of={PATH} />
    </Container>
  );
}
