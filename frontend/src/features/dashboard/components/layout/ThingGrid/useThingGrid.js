import {getThingsCard} from "../../../apis/thingCardApi.js"
import useFetch from "../../../../../shared/hooks/useFetch.js";


export default function useThingGrid() {
  const { data: fetchThingCard } = useFetch(getThingsCard);
  return{
    fetchThingCard
  }
}
