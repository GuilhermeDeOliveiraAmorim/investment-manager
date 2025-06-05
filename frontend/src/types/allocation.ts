export interface Allocation {
  id: string;
  clientId: string;
  assetId: string;
  currentValue: number;
}

export interface CreateAllocationInput {
  clientId: string;
  assetId: string;
  currentValue: number;
}

export interface UpdateAllocationInput {
  allocationId: string;
  currentValue: number;
}

export interface AllocationResponse {
  allocation: {
    id: string;
    clientId: string;
    assetId: string;
    currentValue: number;
  };
}
