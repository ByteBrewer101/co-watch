import { Button } from "@/components/ui/button";


import { toast } from "sonner";

export function TestPage(){



   


    function handleCreate() {
      toast("handleCreate");
    }

    function handleJoin() {
      toast("handleJoin");
    } 

    return (
      <div>
        
        <Button onClick={handleCreate}>Create</Button>
        <Button onClick={handleJoin}>Join</Button>
        Testpage
      </div>
    );
}