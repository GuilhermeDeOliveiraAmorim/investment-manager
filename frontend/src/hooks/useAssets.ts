import { useQuery } from "@tanstack/react-query";
import * as assetsService from "../services/assets";

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: assetsService.getAllAssets,
  });
}
