import {
  FC,
  JSX,
  ReactNode,
} from "react";

import Link from "next/link";

import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: () => JSX.Element;
  };
  icon?: ReactNode;
}

interface GridItem {
  id: string;
  name: string;
  href?: string;
}

interface GridProps {
  data: GridItem[];
  resourceName: string;
  title: string;
  onAdd?: () => void;
  emptyState?: {
    title: string;
    description?: string;
    icon?: ReactNode;
  };
}

const LoadingCard = () => (
  <div className="h-32 bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
);

export const LoadingGrid: FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="space-y-4">
    <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: count }, (_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  </div>
);

const GridCard: FC<{ item: GridItem; href: string }> = ({ item, href }) => (
  <Button
    key={item.id}
    block
    tag={Link}
    href={href}
    className="h-32 group hover:shadow-md transition-shadow duration-200"
    layout="outline"
    size="larger"
  >
    <div className="flex flex-col items-center justify-center h-full">
      <span className="font-medium group-hover:text-blue-600 transition-colors">
        {item.name}
      </span>
    </div>
  </Button>
);

const AddCard: FC<{ onAdd?: () => void; resourceName: string }> = ({
  onAdd,
  resourceName,
}) => (
  <Button
    className="h-32 hover:shadow-md hover:text-blue-600 transition-shadow duration-200"
    block
    onClick={onAdd}
    layout="outline"
    icon={FaPlus}
    size="larger"
    aria-label={`Add new ${resourceName}`}
  >
    <span className="sr-only">Add new {resourceName}</span>
  </Button>
);

export const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    {icon && <div className="mb-4 text-gray-400">{icon}</div>}
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    {description && (
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
    )}
    {action && (
      <Button
        onClick={action.onClick}
        layout="blue"
        icon={action.icon}
        className="inline-flex items-center"
      >
        {action.label}
      </Button>
    )}
  </div>
);

export const Grid: FC<GridProps> = ({
  data,
  resourceName,
  title,
  onAdd,
  emptyState,
}) => {
  const hasData = data.length > 0;

  if (!hasData && emptyState) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl mb-4 font-semibold">{title}</h1>
        <EmptyState
          title={emptyState.title}
          description={emptyState.description}
          icon={emptyState.icon}
          action={
            onAdd
              ? {
                  label: `Create your first ${resourceName}`,
                  onClick: onAdd,
                  icon: () => <FaPlus className="w-4 h-4 mr-2" />,
                }
              : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <span className="text-sm text-gray-500">
          {data.length} {data.length === 1 ? resourceName : `${resourceName}s`}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((item) => (
          <GridCard
            key={item.id}
            item={item}
            href={item.href || `/dashboard/${resourceName}/${item.id}`}
          />
        ))}
        {onAdd && <AddCard onAdd={onAdd} resourceName={resourceName} />}
      </div>
    </div>
  );
};